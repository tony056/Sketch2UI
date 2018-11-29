# Sketch2UI

## Introduction

## Project Usage

## Project Structure
```bash
.
├── README.md
├── dataset_analysis
│   ├── dataset_analysis.json
│   └── dataset_analysis.py
└── sketch2ui-aws-client
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── components
    │   │   ├── Canvas.js
    │   │   ├── ClassToast.js
    │   │   ├── LogInModal.js
    │   │   └── TaskDisplay.js
    │   ├── config.js
    │   ├── containers
    │   │   ├── NavBar.js
    │   │   └── SketchingContainer.js
    │   ├── index.css
    │   ├── index.js
    │   ├── libs
    │   │   ├── aws-lib.js
    │   │   └── utils.js
    │   ├── logo.svg
    │   └── serviceWorker.js
    └── yarn.lock
```

## Project Components

### 1. Dataset Analysis
#### Usage
`python3 dataset_analysis.py [PATH_TO_DATASET_DIR] [REPORT_NAME](Optional) [MAP_NAME](Optional)`

#### Extend report content
1. set *optional* => True for *write_result_to_file*
2. add additional properties to result after `if optional:`

### 2. Dataset Generator
#### Usage
`python3 dataset_analysis.py --ps [PATH_TO_Rico_DATASET_DIR] --pc [PATH_TO_CJ_DATASET_DIR] \
                             --po [PATH_TO_OUTPUT_DATASET_DIR] --pm [PATH_TO_MAP_FILE] \
                             --gm [INDICATE_TO_GENERATE_MAP] --pcjc [PATH_TO_CJ_FILES_COMPONENTS_JSON] \
                             --pa [PATH_TO_OUTPUT_ANATATIONS]`

#### Output
1. Map.json
2. anatations.json
3. Pb_anatations.json
4. $PATH_TO_OUTPUT_DATASET_DIR/img1.jpg img2.jpg ...
