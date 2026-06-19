name: Feature Request
description: Suggest an idea for this project
title: "[Feature] "
labels: ["enhancement"]
assignees: []
body:
  - type: markdown
    attributes:
      value: |
        ## Feature Request

        Thank you for suggesting a feature!

  - type: textarea
    id: description
    attributes:
      label: Feature Description
      description: A clear and concise description of the feature.
      placeholder: Describe the feature here...
    validations:
      required: true

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: What problem does this feature solve?
      placeholder: Describe the problem this feature would solve...

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: Describe your proposed solution.
      placeholder: Describe your solution here...

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives
      description: Any alternative solutions you've considered?

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Any other context about the feature request?

  - type: markdown
    attributes:
      value: |
        ---

        Author: Davey Wong <wgwcko@gmail.com> (https://www.guangweiblog.com)
