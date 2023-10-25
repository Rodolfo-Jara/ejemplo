using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebAPIWithReact.Models;

public partial class SampleBdContext : DbContext
{
    public SampleBdContext()
    {
    }

    public SampleBdContext(DbContextOptions<SampleBdContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;initial catalog=SampleBD;trusted_connection=yes;TrustServerCertificate=yes;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04F11F346B0D6");

            entity.Property(e => e.City)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Departament)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
