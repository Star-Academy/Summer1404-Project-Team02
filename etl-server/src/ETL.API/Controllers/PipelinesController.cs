using ETL.API.Infrastructure;
using ETL.Application.WorkFlow.Pipelines;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ETL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PipelinesController : ControllerBase
{
    private readonly IMediator _mediator;

    public PipelinesController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var result = await _mediator.Send(new GetAllPipelinesQuery(), ct);
        return Ok(result.Value);
    }

    [HttpGet("get-pipeline")]
    public async Task<IActionResult> GetById([FromQuery]GetPipelineByIdQuery request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);
        return Ok(result.Value);
    }

    [HttpPost("create-pipeline")]
    public async Task<IActionResult> Create([FromBody] CreatePipelineCommand command, CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);
        return Ok(result.Value);
    }

    [HttpPut("rename-pipeline")]
    public async Task<IActionResult> Rename(RenamePipelineCommand request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);
        return Ok(new { message = "pipeline has been renamed." });
    }

    [HttpDelete("delete-pipeline")]
    public async Task<IActionResult> Delete(DeletePipelineCommand command, CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);
        return Ok(new { message = "Pipeline has been removed." });
    }
}