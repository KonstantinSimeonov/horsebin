'use strict';

module.exports = dataServices => {
    const { reports } = dataServices;

    return {
        createReport(req, res) {
            const { content } = req.body,
                author = req.user.username,
                pasteId = req.params.pasteId;
                console.log(content);
            reports
                .createReport({ pasteId, content, author })
                .then(dbRes => res.status(201).json({ success: true, msg: 'Report created!' }))
                .catch(error => console.log(error) || res.json({ success: false, msg: error.message }));
        },

        byId(req, res) {
            reports
                .byId(req.params.pasteId)
                .then(report => res.json(report))
                .catch(err => console.log(err) || res.json(err));
        },

        paged(req, res) {
            const pageSize = +req.query.pageSize,
                pageNumber = +req.query.page;

            reports
                .paged({ pageSize, pageNumber })
                .then(pagedReports => res.json(pagedReports))
                .catch(err => console.log(err) || res.json(err));
        }
    }
};