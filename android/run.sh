#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n ir.ac.kntu.instagram/host.exp.exponent.MainActivity
