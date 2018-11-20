# Sketch2UI

## Introduction

## Project Usage

## Project Structure
```bash
.
├── README.md
└── dataset_analysis
    ├── dataset_analysis.py
    ├── Map.json
    └── analysis
        ├── dataset_analysis.json
        ├── dataset_components_analysis.json
        ├── CJ_dataset_analysis.json
        ├── CJ_components_analysis.json
        ├── nonCJ_dataset_analysis.json
        └── nonCJ_components_analysis.json
```

## Project Components

### 1. Dataset Analysis
#### Usage
`python3 dataset_analysis.py [PATH_TO_DATASET_DIR] [REPORT_NAME] [MAP_NAME](Optional)`

#### Extend report content
1. set *optional* => True for *write_result_to_file*
2. add additional properties to result after `if optional:`
