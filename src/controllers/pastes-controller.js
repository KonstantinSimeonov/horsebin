'use strict';

const { PasteViewModel, UserPasteViewModel, EmbedPasteViewModel } = require('../viewmodels');

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

            if (req.user && req.user.likedPastesIds && (req.user.likedPastesIds.indexOf(paste._id.toString()) !== -1)) {
                console.log('what');
                viewData.likedByUser = true;
            }

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
                .then(success => {
                    console.log(success);
                    res.redirect(req.headers.referer);
                })
                .catch(err => {
                    console.log(err);
                    res.redirect(req.headers.referer);
                })
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

            const paste = req.body;

            if (!paste.pswd) {
                delete paste.pswd;
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
            const pageSize = +req.query.pageSize,
                pageNumber = +req.query.page,
                contains = req.query.contains,
                author = req.query.author;

            pastes.paged({ pageSize, pageNumber, contains, author })
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
            const pasteId = req.params.pasteId;

            if (req.user.likedPastesIds && req.user.likedPastesIds.indexOf(pasteId) !== -1) {
                return pastes
                        .updateLike(pasteId, req.user._id, false)
                        .then(updatedPasteAndUser => {
                            const unlikedPaste = updatedPasteAndUser[0].value;
                            unlikedPaste.likesCount -= 1;

                            res.status(200).json(unlikedPaste);
                        })
                        .catch(err => console.log(err) || res.status(500).json(err));
            }

            pastes
                .updateLike(pasteId, req.user._id, true)
                .then(updatedPasteAndUser => {
                    const likedPaste = updatedPasteAndUser[0].value;
                    likedPaste.likesCount += 1;

                    res.status(201).json(likedPaste);
                });
        }
    }
}