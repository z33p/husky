using System;
using Amazon;
using Amazon.S3;
using Amazon.Translate;
using GithubSyncer.Contracts;
using GithubSyncer.Contracts.Shared;
using GithubSyncer.Handlers;
using GithubSyncer.Helpers.Shared;
using GithubSyncer.Services.Shared;
using GithubSyncer.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GithubSyncer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Config
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            ConfigureAppEnvironment(services);

            // Singleton
            services.AddSingleton<IExternalRoutes, ExternalRoutes>();
            services.AddSingleton<IS3Helper, S3Helper>();

            // Services
            services.AddScoped<IGithubService, GithubService>();

            // Controllers
            services.AddControllers();

            // AWS - Region USEast1
            var awsOptions = Configuration.GetAWSOptions();

            awsOptions.Region = RegionEndpoint.USEast1;
            services.AddAWSService<IAmazonTranslate>(awsOptions);

            // AWS - Region Generic
            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();

            services.AddSwaggerGen();
        }

        private static void ConfigureAppEnvironment(IServiceCollection services)
        {
            var githubAccessToken = Environment.GetEnvironmentVariable("GITHUB_ACCESS_TOKEN");

            var appEnvironment = new AppEnvironment(
                githubAccessToken: githubAccessToken
            );

            services.AddSingleton<AppEnvironment>(appEnvironment);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Welcome to running ASP.NET Core on AWS Lambda");
                });
            });
        }
    }
}
