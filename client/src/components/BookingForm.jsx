import React, { Component } from 'react';

class CarBookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client_name: '',
            dealer_name: '',
            car_name: '',
            number_plate: '',
            price: '',
            destination: '',
            booking_date: '',
            return_date: ''
        };
    }


    render() {
        return (
            <div>
                <h2>Car Booking Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="client_name">Client Name:</label>
                    <input type="text" id="client_name" name="client_name" value={this.state.client_name} onChange={this.handleChange} required />

                    <label htmlFor="dealer_name">Dealer Name:</label>
                    <input type="text" id="dealer_name" name="dealer_name" value={this.state.dealer_name} onChange={this.handleChange} required />

                    <label htmlFor="car_name">Car Name:</label>
                    <select id="car_name" name="car_name" value={this.state.car_name} onChange={this.handleChange} required>
                        <option value="">Select Car</option>
                        <option value="Car 1">Car 1</option>
                        <option value="Car 2">Car 2</option>
                        {/* Add more car options here */}
                    </select>

                    <label htmlFor="number_plate">Number Plate:</label>
                    <select id="number_plate" name="number_plate" value={this.state.number_plate} onChange={this.handleChange} required>
                        <option value="">Select Number Plate</option>
                        <option value="Plate 1">Plate 1</option>
                        <option value="Plate 2">Plate 2</option>
                        {/* Add more number plate options here */}
                    </select>

                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" name="price" value={this.state.price} onChange={this.handleChange} required />

                    <label htmlFor="destination">destination:</label>
                    <input type="text" id="destination" name="destination" value={this.state.destination} onChange={this.handleChange} required />

                    <label htmlFor="booking_date">Booking Date:</label>
                    <input type="date" id="booking_date" name="booking_date" value={this.state.booking_date} onChange={this.handleChange} required />

                    <label htmlFor="return_date">Return Date:</label>
                    <input type="date" id="return_date" name="return_date" value={this.state.return_date} onChange={this.handleChange} required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default CarBookingForm;
