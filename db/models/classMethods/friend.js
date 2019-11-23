module.exports = {
    latest: function(page){
        return this.paginate({
            order: [["created_at", "DESC"]],
            page,
            paginate: 30
        }).then((res) => res)
            .catch((err) => err);
    }
};
