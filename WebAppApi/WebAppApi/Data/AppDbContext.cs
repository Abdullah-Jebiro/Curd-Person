using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebAppApi.Model;

namespace WebAppApi.Data
{
    public class AppDbContext :DbContext
    {
        public virtual DbSet<Person> Person { get; set; } = null!;
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(log => Console.WriteLine(log),
                new[] { DbLoggerCategory.Database.Command.Name },
                LogLevel.Information).EnableSensitiveDataLogging();
        }

    }
}
