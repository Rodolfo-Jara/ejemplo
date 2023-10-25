using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using WebAPIWithReact.Models;

namespace WebAPIWithReact.Controllers
{
    
    [ApiController]
    [Route("employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly SampleBdContext _context;

        public EmployeeController(SampleBdContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        [Route("listar")]
        public async Task<ActionResult> Lista()
        {
            List<Employee> lista = await _context.Employees.OrderByDescending(e => e.EmployeeId).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
        
        // POST: api/Employees

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Employee request)
        {
            await _context.Employees.AddAsync(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        
        // PUT: api/Employees/5

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> Editar([FromBody] Employee request)
        {
            _context.Employees.Update(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        // DELETE: api/Employees/5
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {

            Employee employe = _context.Employees.Find(id);

            _context.Employees.Remove(employe);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        //========================

    }
}
