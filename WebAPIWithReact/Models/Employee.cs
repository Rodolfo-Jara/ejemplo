using System;
using System.Collections.Generic;

namespace WebAPIWithReact.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string Name { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Departament { get; set; } = null!;

    public string Gender { get; set; } = null!;
}
