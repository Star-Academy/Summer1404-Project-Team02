using ETL.Application.Abstractions.Pipelines;
using ETL.Domain.Entities;
using ETL.Infrastructure.WorkflowContexts;
using Microsoft.EntityFrameworkCore;

namespace ETL.Infrastructure.Transform.PipelineOperations;

public class GetAllPipelines : IGetAllPipelines
{
    private readonly IDbContextFactory<WorkflowDbContext> _contextFactory;
    public GetAllPipelines(IDbContextFactory<WorkflowDbContext> contextFactory) => _contextFactory = contextFactory;

    public async Task<IEnumerable<Pipeline>> ExecuteAsync(CancellationToken cancellationToken = default)
    {
        await using var context = await _contextFactory.CreateDbContextAsync(cancellationToken);
        return await context.Pipelines.AsNoTracking().Include(p => p.Steps).ToListAsync(cancellationToken);
    }
}