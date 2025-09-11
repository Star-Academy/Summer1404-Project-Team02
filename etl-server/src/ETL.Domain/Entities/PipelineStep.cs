using ETL.Domain.Common;

namespace ETL.Domain.Entities;

public class PipelineStep : BaseEntity
{
    public Guid PipelineId { get; private set; } // FK to Pipeline
    public Pipeline Pipeline { get; private set; }

    public int StepOrder { get; private set; }
    public string PluginType { get; private set; }
    public string Configuration { get; private set; }

    private PipelineStep() { } // EF Core

    public PipelineStep(Guid pipelineId, int stepOrder, string pluginType, string configuration)
    {
        PipelineId = pipelineId;
        StepOrder = stepOrder;
        PluginType = pluginType;
        Configuration = configuration;
    }
}