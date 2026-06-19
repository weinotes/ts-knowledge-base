name: Bug Report
description: Create a report to help us improve
title: "[Bug] "
labels: ["bug"]
assignees: []
body:
  - type: markdown
    attributes:
      value: |
        ## Bug Report

        Thank you for reporting a bug!

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: A clear and concise description of what the bug is.
      placeholder: Describe the bug here...
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior.
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What you expected to happen.
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened.
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots to help explain your problem.

  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: |
        - OS: [e.g., macOS, Windows, Linux]
        - Browser: [e.g., Chrome, Safari]
        - Node.js version: [e.g., 18.x]
      placeholder: |
        - OS:
        - Browser:
        - Node.js version:

  - type: markdown
    attributes:
      value: |
        ---

        Author: Davey Wong <wgwcko@gmail.com> (https://www.guangweiblog.com)
