import { PaginationStateManager } from '@twotalltotems/paginatable-list';

const BASE_URL = 'https://maps.googleapis.com/maps/api';


const onParsePaginationData = (data) => {
    const { results } = data
    return {
        items: results
    }
}

const paginationStateManager = new PaginationStateManager('places', `${BASE_URL}/place/nearbysearch/json`, onParsePaginationData);



export { paginationStateManager }