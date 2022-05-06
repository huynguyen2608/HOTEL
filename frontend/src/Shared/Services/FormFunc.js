export const FORM = {
    initForm(data){
        
    },
    onInputChange(ev, key, cb) {
        ev.persist();
        cb((prevState) => {
            prevState.form[key] = {
                value: ev.target.value,
                err: '',
            }
            return prevState;
        });
    }

}


