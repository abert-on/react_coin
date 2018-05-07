import React from 'react';
import Loading from '../common/Loading';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component{
    constructor() {
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        const { page } = this.state;

        this.setState({ loading: true });

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                const { currencies, totalPages } = data;
                this.setState({ 
                    currencies, 
                    totalPages,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({ 
                    error: error.errorMessage, 
                    loading: false 
                });
        });
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage -1;

        this.setState({ page: nextPage }, () => {
            // use callback to ensure stae is updated before updating page
            this.fetchCurrencies();
        });
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;
        // render only spinny wheel when loading state set to true
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        // render only error message when error state set (error fetching data)
        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table 
                    currencies={currencies} 
                />
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;