module.exports = {
    updateReadAt: function(){
        return this.update({ read: 1, read_at: new Date() })
            .then((res) => res)
            .catch((err) => err);
    },
    isAssociatedWith: function(id){
        return this.to === id || this.from === id;
    }
};
