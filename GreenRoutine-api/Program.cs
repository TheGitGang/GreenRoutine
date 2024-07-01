using GreenRoutine;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "server=localhost;user=greenroutine;password=greenroutine;database=green_routine";
var serverVersion = new MySqlServerVersion(new Version(8,0, 36));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ChallengeDbContext>(dbContextOptions => dbContextOptions.UseMySql(connectionString, serverVersion));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
