document.addEventListener('alpine:init', () => {
    Alpine.data('pricePlan', () => {
        return {
            plan: '',
            edit_id: '',
            actions: '',
            total: '',
            pricePlans: [],
            searchPlanName: '',
            
            updatePlanName: '',
            updatedCallCost: '',
            updatedSmsCost: '',
            deletePlanName: '',
            show: false,
            hidden: false,

            init() {
                this.fetchPricePlans();
            },


            fetchPricePlans() {
                axios.get('/api/price_plans')
                    .then(response => {
                        this.pricePlans = response.data.price_plans;
                        console.log(this.pricePlans)
                    })
            },

            addPlan() {

                axios.post('/api/price_plan/create', {
                    plan_name: this.updatePlanName,
                    call_price: this.updatedCallCost,
                        sms_price: this.updatedSmsCost
                })
                    .then(() => {
                        this.fetchPricePlans();
                        setTimeout(() => {
                            this.updatedCallCost= '';
                            this.updatedSmsCost = '';
                            this.updatePlanName = '';
                        }, 30);
                    })


            },
            deletePricePlan(id) {
                axios.post('/api/price_plan/delete', {
                    id: id
                })
                    .then((res) => {
                        console.log(res.data)

                        this.fetchPricePlans();

                    })
            },
            updatePricePlan(plan_name, sms_price, call_price, edit_id) {
                // if (!this.updatePlanName || !this.updatedCallCost || !this.updatedSmsCost) return;
                axios.post('/api/price_plan/update', {
                    plan_name: this.updatePlanName,
                    call_price: this.updatedCallCost,
                    sms_price: this.updatedSmsCost,
                    id: this.edit_id

                })
                    .then((res) => {
                        console.log(res.data)

                        this.fetchPricePlans();
                        show = false;
                        setTimeout(() => {
                            this.updatedCallCost= '';
                            this.updatedSmsCost = '';
                            this.updatePlanName = '';
                        }, 30);
                    })
            },
            calculateBill() {
                axios
                    .post('api/price_plan/phonebill', {
                        actions: this.actions,
                        plan_name: this.searchPlanName

                    })
                    .then((result) => {
                        this.total = result.data.total;
                    })
            },


            // async findPricePlan() {
            //     if (!this.searchPlanName) return;

            //     const response = await fetch(`/api/price_plan/${this.searchPlanName}`);
            //     this.foundPlan = await response.json();
            // },

            // async updatePricePlan() {
            //     if (!this.updatePlanName || !this.updatedCallCost || !this.updatedSmsCost) return;

            //     axios.Post('/api/price_plan/update', {
            //         name: this.updatePlanName,
            //         call_cost: this.updatedCallCost,
            //         sms_cost: this.updatedSmsCost

            //     })
            //         .then(response => {
            //             this.updatePlanName = '';
            //             this.updatedCallCost = '';
            //             this.updatedSmsCost = '';

            //             this.fetchPricePlans();
            //         })


            // },

        
        }
    })

})