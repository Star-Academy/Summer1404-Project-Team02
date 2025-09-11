using ETL.Application.Abstractions.Pipelines;
using ETL.Infrastructure.WorkflowContexts;
using Microsoft.EntityFrameworkCore;

namespace ETL.Infrastructure.Transform.PipelineOperations;

public class DeletePipeline : IDeletePipeline
{
    private readonly IDbContextFactory<WorkflowDbContext> _contextFactory;
    public DeletePipeline(IDbContextFactory<WorkflowDbContext> contextFactory) => _contextFactory = contextFactory;

    public async Task ExecuteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await using var context = await _contextFactory.CreateDbContextAsync(cancellationToken);
        var pipeline = await context.Pipelines.FindAsync(new object[] { id }, cancellationToken);
        if (pipeline == null)
            throw new KeyNotFoundException($"Pipeline {id} not found");

        context.Pipelines.Remove(pipeline);
        await context.SaveChangesAsync(cancellationToken);
    }
}