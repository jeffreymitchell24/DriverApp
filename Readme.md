for release in android/app/build.gradle

project.ext.react = [
        entryFile: "index.js",
        jsBundleDirRelease: "$buildDir/intermediates/merged_assets/release/mergeReleaseAssets/out"
]

install node modules with yarn