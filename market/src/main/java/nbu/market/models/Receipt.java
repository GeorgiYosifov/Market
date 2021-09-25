package nbu.market.models;

import java.time.LocalTime;

public class Receipt {
    public String EmployeeId;
    public LocalTime CreatedOn;
    public Customer Customer;

    public Receipt(String employeeId, Customer customer) {
        this.EmployeeId = employeeId;
        this.CreatedOn = LocalTime.now();
        this.Customer = customer;
    }
}
