(async function () {
  /**
   * @typedef Link
   * @property {String} name
   * @property {String} url
   * @property {String} [icon]
   */

  /**
   * @typedef Project
   * @property {String} title
   * @property {String} [description]
   * @property {String[]} [technologies]
   * @property {String[]} [labels]
   * @property {Link[]} [links]
   * @property {Link[]} [analyses]
   */

  const labelToClassMap = { Contribute: "help", MVP: "mvp", POC: "poc" };
  /**
   *
   * @param {Project['links']} links
   * @returns {HTMLElement}
   */
  function buildLinksBlock(links) {
    const linksBlock = document.createElement("div");
    linksBlock.classList.add("links");

    linksBlock.append.apply(
      linksBlock,
      links.map((link) => {
        const spanWrapper = document.createElement("span");

        const linkElement = document.createElement("a");

        linkElement.append(document.createTextNode(` ${link.name}`));
        linkElement.target = "_blank";
        linkElement.href = link.url;

        if (link.icon) {
          const iconElement = document.createElement("i");
          iconElement.className = `fa ${link.icon}`;
          spanWrapper.append(iconElement);
        }

        spanWrapper.append(linkElement);

        return spanWrapper;
      })
    );
    return linksBlock;
  }

  /**
   *
   * @param {Project['analyses']} analyses
   * @returns {HTMLElement}
   */
  function buildAnalysesBlock(analyses) {
    const analysesBlock = document.createElement("ul");
    analysesBlock.classList.add("simple-list");

    analysesBlock.append.apply(
      analysesBlock,
      analyses.map((analysis) => {
        const analysisElement = document.createElement("li");

        if (analysis.icon) {
          const iconElement = document.createElement("i");
          iconElement.className = `fa ${analysis.icon}`;
          analysisElement.append(iconElement);
        }

        const linkElement = document.createElement("a");
        linkElement.append(document.createTextNode(` ${analysis.name}`));
        linkElement.target = "_blank";
        linkElement.href = analysis.url;

        analysisElement.append(linkElement);

        return analysisElement;
      })
    );
    return analysesBlock;
  }
  /**
   *
   * @param {Project['description']} description
   * @returns {HTMLElement[]}
   */
  function buildDescription(description) {
    return description.split("\n").map((line) => {
      const paragraph = document.createElement("p");
      // description can contain HTML tags for additional styles
      paragraph.innerHTML = line;

      return paragraph;
    });
  }

  /**
   *
   * @param {Project['technologies']} technologies
   * @returns {HTMLElement}
   */
  function buildTechnologiesBlock(technologies) {
    const technologiesBlock = document.createElement("div");

    const technologiesTitle = document.createElement("h6");
    technologiesTitle.append(document.createTextNode("Технологии:"));

    technologiesBlock.append(technologiesTitle);

    const options = document.createElement("ul");
    options.classList.add("options");

    options.append.apply(
      options,
      technologies.map((technology) => {
        const technologyBlock = document.createElement("li");
        technologyBlock.append(document.createTextNode(technology));

        return technologyBlock;
      })
    );

    technologiesBlock.append(options);
    return technologiesBlock;
  }

  /**
   *
   * @param {Project['labels']} labels
   * @returns
   */
  function buildLabelsBlock(labels) {
    const labelsBlock = document.createElement("div");
    labelsBlock.classList.add("labels");

    labelsBlock.append.apply(
      labelsBlock,
      labels.map((label) => {
        const labelElement = document.createElement("label");
        labelElement.classList.add(labelToClassMap[label]);

        const labelText = document.createElement("i");
        labelText.classList.add("fa", "fa-hashtag");
        labelText.append(document.createTextNode(label));
        labelElement.append(labelText);

        return labelElement;
      })
    );

    return labelsBlock;
  }

  /**
   * @param {Project} project
   *
   * @returns {HTMLElement}
   */
  function buildProjectNode(project) {
    const rightBlock = document.createElement("div");
    rightBlock.classList.add("right-block");

    const titleElement = document.createElement("h4");
    titleElement.append(document.createTextNode(project.title));
    rightBlock.append(titleElement);

    if (project.description)
      rightBlock.append.apply(
        rightBlock,
        buildDescription(project.description)
      );

    if (project.technologies && project.technologies.length)
      rightBlock.append(buildTechnologiesBlock(project.technologies));
    if (project.labels && project.labels.length)
      rightBlock.append(buildLabelsBlock(project.labels));
    if (project.links && project.links.length)
      rightBlock.append(buildLinksBlock(project.links));
    if (project.analyses && project.analyses.length)
      rightBlock.append(buildAnalysesBlock(project.analyses));

    return rightBlock;
  }

  /**
   *
   * @param {string} blockName
   */
  async function buildBlock(blockName) {
    const projectsResponse = await fetch(`/${blockName}.json`);
    /** @type {(Project | Project[])[]} */
    const projects = await projectsResponse.json();

    const skeletons = document.querySelectorAll(`.loading-${blockName}`);
    const firstSkeleton = skeletons[0];

    for (const project of projects) {
      const projectElement = document.createElement("div");
      projectElement.classList.add("span3");

      if (Array.isArray(project)) {
        projectElement.append.apply(
          projectElement,
          project.map(buildProjectNode)
        );
      } else {
        projectElement.append(buildProjectNode(project));
      }

      firstSkeleton.insertAdjacentElement("beforebegin", projectElement);
    }

    for (const skeleton of skeletons) {
      skeleton.remove();
    }
  }

  await Promise.all(["projects", "analyses"].map(buildBlock));
})();
