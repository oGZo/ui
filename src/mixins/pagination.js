export default {
    data() {
        return {
            pagination: {
                pageSize: 10,
                currentPage: 1,
                totalItems: 0,
            }
        };
    },
    methods: {
        handleCurrentPageChange(index) {
          this.pagination.currentPage = index;
          this.fetchList(index);
        }
    }
};
