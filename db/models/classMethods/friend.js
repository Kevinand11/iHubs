module.exports = {
    latest: function(page){
        return this.paginate({
            order: [["created_at", "DESC"]],
            page,
            paginate: 25
        }).then((res) => res)
            .catch((err) => err);
    }
};
