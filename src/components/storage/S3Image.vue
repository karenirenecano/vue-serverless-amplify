/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

<template>
  <div>
    <div class="card">
    <img
      @click="blowUp(url)"
      class="amplify-image"
      :src="url"
      onerror="this.onerror=null;this.src='/file_attached.png';"
    />
    <div>
    <label for="">{{ imagePath }}</label>

    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'S3Image',
  props: ['imagePath', 's3ImageConfig', 'fileProperties'],
  data () {
    return {
      url: null,
      error: '',
      logger: {},
    }
  },
  computed: {
    options() {
      //retain for future use
      const defaults = {}
      return Object.assign(defaults, this.s3ImageConfig || {})
    }
  },
  mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name);
    this.getImage();
  },
  methods: {
    getImage() {
      if (!this.imagePath) {
        return this.setError('Image path not provided.')
      }
      this.$Amplify.Storage
        .get(this.imagePath, this.options)
        .then((url) => {
          this.url = url
          })
        .catch(e => this.setError(e));
    },
    blowUp(url) {
      window.open(url);
    },
    setError: function(e) {
      this.error = this.$Amplify.I18n.get(e.message || e);
      this.logger.error(this.error);
    }
  }
}
</script>

<style scoped>
  .amplify-image {
    width: 30%;
    margin: 0.2em;
    border-radius: 6px;
    border: 2px solid var(--color-white);
    cursor: pointer;
  }
</style>