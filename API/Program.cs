using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scoup = host.Services.CreateScope())
            {
                var servise = scoup.ServiceProvider;
                try
                {
                    var context = servise.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                }
                catch (System.Exception ex)
                {
                    var logget = servise.GetRequiredService<ILogger<Program>>();
                    logget.LogError(ex, "Erorr Migration");
                }
                host.Run();
            }
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
