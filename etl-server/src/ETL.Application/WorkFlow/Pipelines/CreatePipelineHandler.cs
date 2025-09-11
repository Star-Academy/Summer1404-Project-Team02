using ETL.Application.Abstractions.Pipelines;
using ETL.Application.Abstractions.Repositories;
using ETL.Application.Common;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;

public record CreatePipelineCommand(string Name, Guid DataSourceId) : IRequest<Result<Guid>>;

public sealed class CreatePipelineHandler : IRequestHandler<CreatePipelineCommand, Result<Guid>>
{
    private readonly ICreatePipeline _createPipeline;
    private readonly IGetDataSetById _getDataSetById;

    public CreatePipelineHandler(ICreatePipeline service, IGetDataSetById getDataSetById)
    {
        _createPipeline = service;
        _getDataSetById = getDataSetById;
    }

    public async Task<Result<Guid>> Handle(CreatePipelineCommand request, CancellationToken cancellationToken)
    {
        var dataset = await _getDataSetById.ExecuteAsync(request.DataSourceId, cancellationToken);
        if (dataset == null)
            return Result.Failure<Guid>(Error.NotFound("PipelineCreate.Failed",
                $"Data Source {request.DataSourceId} not found"));

        // if pipeline names should be unique, add it to constraints and check it here.
        var pipeline = new Pipeline(request.Name, request.DataSourceId);
        var created = await _createPipeline.ExecuteAsync(pipeline, cancellationToken);
        return Result.Success(created);
    }
}