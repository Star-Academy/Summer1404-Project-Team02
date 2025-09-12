using ETL.Application.Abstractions.Pipelines;
using ETL.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ETL.Infrastructure.Transform.PluginOperations;

public sealed class DeletePlugin : IDeletePlugin
{
    private readonly IDbContextFactory<WorkflowDbContext> _contextFactory;

    public DeletePlugin(IDbContextFactory<WorkflowDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public async Task ExecuteAsync(Guid pluginId, CancellationToken cancellationToken = default)
    {
        await using var context = await _contextFactory.CreateDbContextAsync(cancellationToken);

        var plugin = await context.Plugins.FirstOrDefaultAsync(p => p.Id == pluginId, cancellationToken);
        if (plugin == null)
            return; // Or throw NotFoundException if you prefer

        context.Plugins.Remove(plugin);
        await context.SaveChangesAsync(cancellationToken);
    }
}