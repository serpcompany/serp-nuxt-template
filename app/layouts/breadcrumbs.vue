<template>
  <div>
    <div class="container mx-auto mb-4 mt-8">
      <slot name="breadcrumbs">
        <SiteBreadcrumbs />
      </slot>
    </div>
    <slot />
  </div>
</template>
