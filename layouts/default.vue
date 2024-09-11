<template>
    <div class="page-container max-x-screen">
        <Header />
        <div>
            <div class="mx-auto flex">
                <Breadcrumbs class="m-4 w-screen max-w-7xl" />
            </div>
            <slot />
        </div>
        <Footer class="mx-auto mt-16 xl:grid-cols-3" />
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
