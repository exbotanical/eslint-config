<template>
  <div>
    <h1 >{{ greeting }}</h1>
    <button @click="incrementCounter">Click me!
    </button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script setup lang="ts">
// Define reactive data and props
import { ref } from 'vue';

const graphql = `
    query userConfig {
    site {
        siteMetadata {
          config {
            contentDir
            assetDir
            embeddedImageWidth
            embeddedVideoWidth
            basePath
            iconPath
            iconCachePaths
            iconList {
              src
              sizes
              type
              purpose
            }
            organization {
              description
              logoUrl
              name
              url
            }
            pathPrefix
            user {
              about
              avatar
              firstName
              github
              email
              id
              surname
              linkedIn
              location
              twitterHandle
              youtubeUrl
            }
            site {
              backgroundColor
              copyright {
                link
                name
              }
              description
              language
              facebookAppId
              googleAnalyticsId
              disqusShortname
              logoUrl
              name
              rss
              rssTitle
              themeColor
              title
              titleAbridged
              twitterHandle
              url,
            }
          }
        }
      }
    }
`

const greeting = ref('Hello, Vue 3!');
let counter = ref<number  | 1>(0);

// Define a function
const incrementCounter = () => {
  counter.value++;
};
</script>

<style>
.a {  color:   red }
</style>

<style lang="scss">
$font-stack: Helvetica, sans-serif;
$primary-color:   #333;

body { font: 100% $font-stack;
  color: $primary-color;
}
</style>
