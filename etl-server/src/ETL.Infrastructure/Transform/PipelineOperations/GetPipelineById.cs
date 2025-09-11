﻿using ETL.Application.Abstractions.Pipelines;
using ETL.Domain.Entities;
using ETL.Infrastructure.WorkflowContexts;
using Microsoft.EntityFrameworkCore;

namespace ETL.Infrastructure.Transform.PipelineOperations;

public class GetPipelineById : IGetPipelineById
{
    private readonly IDbContextFactory<WorkflowDbContext> _contextFactory;
    public GetPipelineById(IDbContextFactory<WorkflowDbContext> contextFactory) => _contextFactory = contextFactory;

    public async Task<Pipeline?> ExecuteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await using var context = await _contextFactory.CreateDbContextAsync(cancellationToken);
        return await context.Pipelines.Include(p => p.Steps)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }
}