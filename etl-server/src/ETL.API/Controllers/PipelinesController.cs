using ETL.Application.WorkFlow.Pipelines;
using ETL.Domain.Entities;
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
    public async Task<IEnumerable<Pipeline>> GetAll(CancellationToken ct)
    {
        return await _mediator.Send(new GetAllPipelinesQuery(), ct);
    }

    [HttpGet("get-pipeline")]
    public async Task<ActionResult<Pipeline>> GetById(GetPipelineByIdQuery request, CancellationToken ct)
    {
        var pipeline = await _mediator.Send(request, ct);
        return pipeline == null ? NotFound() : Ok(pipeline);
    }

    [HttpPost("create-pipeline")]
    public async Task<Guid> Create([FromBody] CreatePipelineCommand command, CancellationToken ct)
    {
        
        return await _mediator.Send(command, ct);
    }

    [HttpPut("rename-pipeline")]
    public async Task<IActionResult> Rename(RenamePipelineCommand request, CancellationToken ct)
    {
        await _mediator.Send(request, ct);
        return Ok(new { message = "Column has been renamed." });
    }

    [HttpDelete("delete-pipeline")]
    public async Task<IActionResult> Delete(DeletePipelineCommand command, CancellationToken ct)
    {
        await _mediator.Send(command, ct);
        return Ok(new { message = "Pipeline has been removed." });
    }
}