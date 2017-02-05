'use strict';

const { PasteViewModel, UserPasteViewModel, EmbedPasteViewModel } = require('../viewmodels'),
    createValidator = require('fluent-schemer'),
    { string, number, object } = createValidator().schemas;

const createPasteSchema = object({
    name: string().pattern(/^[a-z|\d|\s]{2,20}$/i),
    lang: string().minlength(1).maxlength(20),
    content: string().required().minlength(4).maxlength(1024 * 500),
    pswd: string().minlength(2).maxlength(20)
}),
    searchTermSchema = string().required().pattern(/^[a-z|\d|\s]{0,20}$/i);

module.exports = (dataServices) => {
    const { pastes, languages } = dataServices;

    return {
        byId(req, res) {
            const paste = new PasteViewModel(req.paste, '-visibility-dateCreated'),
                mostRecentPastes = req.mostRecent.map(p => new PasteViewModel(p, '-visibility-dateCreated')),
                viewData = {
                    user: req.user,
                    paste: paste,
                    mostRecentPastes: mostRecentPastes,
                    isUsers: req.user && (req.user.username === paste.author)
                };

            viewData.likedByUser = req.user &&
                req.user.likedPastesIds &&
                (req.user.likedPastesIds.indexOf(paste._id.toString()) !== -1);

            res.status(200).render('paste-details', viewData);
        },
        editContent(req, res) {
            const id = req.params.pasteId,
                newContent = req.body.content,
                author = req.user ? req.user.username : null;

            if (author === null) {
                return res.status(403).render('unauthorized');
            }

            pastes
                .editContent(id, author, newContent)
                .then(success => res.redirect(req.headers.referer))
                .catch(err => res.redirect(req.headers.referer));
        },
        embeded(req, res) {
            const paste = new EmbedPasteViewModel(req.paste);

            res.status(200).render('embed-paste', { paste });
        },
        getCreate(req, res) {
            const languageNames = languages.getLanguageNamesForDropdown(),
                pastes = req.mostRecent.map(p => new PasteViewModel(p, '-visibility-dateCreated'));

            res.status(200).render('create-paste', {
                user: req.user,
                langNames: languageNames,
                mostRecentPastes: pastes
            });
        },
        create(req, res) {
            // TODO: validation

            const paste = {
                content: req.body.content,
                name: req.body.name || null,
                lang: req.body.lang || null,
                pswd: req.body.pswd || null
            };

            const { errors, errorsCount } = createPasteSchema.validate(paste);

            if (errorsCount) {
                const langNames = languages.getLanguageNamesForDropdown(),
                    mostRecentPastes = [];

                return res.status(400).render('create-paste', {
                    user: req.user,
                    errors,
                    langNames,
                    mostRecentPastes
                });
            }

            if (req.user) {
                paste.user_id = req.user._id;
                paste.author = req.user.username;
            }

            pastes
                .createPaste(paste)
                .then(function (dbRes) {
                    const paste = dbRes.ops.pop();

                    res.redirect(`/pastes/${paste._id}/details`);
                })
                .catch(d => {
                    console.log(d);
                    res.json(d)
                });
        },
        byUser(req, res) {
            const user_id = req.user._id;

            pastes
                .pastesByUser(user_id)
                .then(userPastes => {
                    const shortenedPastes = userPastes.map(p => new UserPasteViewModel(p, '-visibility-dateCreated-content'));

                    res.status(200).render('list-pastes', { user: req.user, pastes: shortenedPastes });
                })
                .catch(error => {
                    console.log(error);
                    res.redirect(500, '/error');
                });
        },
        getSearch(req, res) {
            pastes
                .count({ visibility: 'public' })
                .then(count => {
                    res.status(200).render('search', {
                        user: req.user,
                        pagesCount: Math.ceil(count / 10)
                    });
                })
        },
        paged(req, res) {
            const pageObject = {
                pageSize: Math.min(~~req.query.pageSize, 10),
                pageNumber: Math.max(~~req.query.page, 0)
            };

            if(!searchTermSchema.validate(req.query.author).errorsCount) {
                pageObject.author = req.query.author;
            }

            if(!searchTermSchema.validate(req.query.contains).errorsCount) {
                pageObject.contains = req.query.contains;
            }

            pastes.paged(pageObject)
                .then(pagedPastes => {
                    res.status(200).render('paste-table-rows', {
                        user: req.user,
                        pagedPastes: pagedPastes.map(p => new PasteViewModel(p, '-visibility-dateCreated'))
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ success: 'fail' });
                });
        },
        toggleLike(req, res) {
            const pasteId = req.params.pasteId,
                hasLikedPaste = req.user.likedPastesIds && req.user.likedPastesIds.indexOf(pasteId) !== -1;

            if (hasLikedPaste) {
                return pastes
                    .updateLike(pasteId, req.user._id, false)
                    .then(updatedPasteAndUser => {
                        const unlikedPaste = updatedPasteAndUser[0].value;
                        unlikedPaste.likesCount = ~~unlikedPaste.likesCount - 1;

                        res.status(200).json({ likesCount: unlikedPaste.likesCount });
                    })
                    .catch(err => console.log(err) || res.status(500).json(err));
            }

            pastes
                .updateLike(pasteId, req.user._id, true)
                .then(updatedPasteAndUser => {
                    const likedPaste = updatedPasteAndUser[0].value;
                    likedPaste.likesCount = ~~likedPaste.likesCount + 1;

                    res.status(201).json({ likesCount: likedPaste.likesCount });
                });
        }
    }
}