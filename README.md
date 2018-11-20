# Sketch2UI

## Introduction

## Project Usage

## Project Structure
```bash
.
├── README.md
└── dataset_analysis
    ├── dataset_analysis.json
    └── dataset_analysis.py
```

## Project Components

### 1. Dataset Analysis
#### Usage
`python3 dataset_analysis.py [PATH_TO_DATASET_DIR] [REPORT_NAME](Optional)`

#### Extend report content
1. set *optional* => True for *write_result_to_file*
2. add additional properties to result after `if optional:`
