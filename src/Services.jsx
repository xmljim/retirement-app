
import axios from "axios";


class Services {

    calculateRetirement(retirementFormData, funct ) {
        let result = {};
        let url = 'http://localhost:8080/retirement/calculate';

        axios.post(url, retirementFormData)
        .then(response => funct(response.data))
        .catch(error => {
            
            console.error('There was an error!', error);
        });
    }
}

export default new Services();
