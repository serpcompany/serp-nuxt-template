<template>
    <div class="page-container max-x-screen">
        <Header/>
        <div>
            <div class="flex mx-auto">
                <Breadcrumbs class="m-4 max-w-7xl w-screen" />
            </div>
            <slot />
        </div>
        <Footer class="mt-16 mx-auto xl:grid-cols-3" />
    </div>
</template>


<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>