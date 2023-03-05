namespace GithubSyncer.Contracts.External.Github;

public class GithubLanguage
{
    public GithubLanguage(string name, string color)
    {
        Name = name;
        Color = color;
    }

    public string Name { get; set; }
    public string Color { get; set; }
}
