import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { setFilterTerm, setSortBy, setEndDate, setStartDate } from '../actions/filters.action';

import { Input } from './Input';
import InputSelect from './InputSelect';

export class ExpenseListFilters extends React.Component {
    state = {
        startDate: undefined,
        endDate: undefined
    };
    
    onSearchTermChange = (e) => this.props.setFilterTerm(e.target.value);

    onSortChange = (e) => this.props.setSortBy(e.target.value);
    
    setSortBy = (sortBy) => this.props.setSortBy(sortBy);

    setStartDate = (startDate) => this.props.setStartDate(startDate);

    setEndDate = (endDate) => this.props.setEndDate(endDate);    

    options = [
        {
            value: 'byNewest',
            title: 'By Newest'
        }, {
            value: 'byOldest',
            title: 'By Oldest'
        }, {
            value: 'byAmountDescending',
            title: 'Amount Descending'
        }, {
            value: 'byAmountAscending',
            title: 'Amount Ascending'
        }];

    render() {
        return (
            <header className="expense-filters">
                <section>
                    <Input label="Search" id="search-term" type="search" onChange={this.props.setFilterTerm} />
                </section>

                <section>
                    <InputSelect label="Sort" id="sort-expenses" onChange={this.setSortBy} options={this.options} />
                </section>
                
                <section className="expense-filters__dates">
                    <ReactDatePicker
                        selectsStart
                        id="start-date"
                        className="expense-filters__dates__input"
                        dateFormat="dd/MM/yyyy"

                        selected={this.props.filters.startDate}
                        onChange={this.setStartDate}

                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}

                        maxDate={this.state.endDate}
                    />
                    <ReactDatePicker
                        selectsEnd
                        id="end-date"
                        className="expense-filters__dates__input"
                        dateFormat="dd/MM/yyyy"

                        selected={this.props.filters.endDate}
                        onChange={this.setEndDate}
                        
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        
                        minDate={this.state.startDate}
                    />
                </section>
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
    setFilterTerm: (term) => dispatch(setFilterTerm(term))
});

const mapStateToProps = connect((state) => ({ filters: state.filters }), mapDispatchToProps);

export default mapStateToProps(ExpenseListFilters);