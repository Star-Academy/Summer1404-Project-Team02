using ETL.Domain.Entities;

namespace ETL.Application.Common.DTOs;

// public class PipelineDto
// {
//     public Guid Id { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public string Name { get; set; }
//     public Guid DataSourceId { get; set; }
//     public DataSetMetadata DataSource { get; set; }
//     public List<PipelineStep> Steps { get; set; }
// }
public record PipelineDto(Guid Id, string Name, Guid DataSourceId, DataSetMetadata DataSource, List<PipelineStep> Steps, DateTime CreatedAt);