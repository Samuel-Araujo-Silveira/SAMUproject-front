<template>
    <div  class="bg-theme bg-theme9">
        <Banner />
        <div id="login">
            <div id="wrapper">
                <div class="card card-authentication1 mx-auto my-5">
                    <div class="card-body">
                        <div class="card-content p-2">
                            <div class="text-center">
                                <img src="/assets/images/image.png" alt="logo icon"
                                    style="width: 100px; height: auto" />
                            </div>
                            <div class="card-title text-uppercase text-center py-3">Login</div>
                            <FormLogin />
                        </div>
                    </div>
                    <div class="card-footer text-center py-3">
                        <p class="text-warning mb-0">
                            Não Possui Cadastrado?
                            <a>Consulte a Administração</a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>
<script setup>
import { title } from "/composables/title";

definePageMeta({
    middleware: ["authenticated"],
});

title("Login");
</script>
<style>
#login {
    padding-top: 5%;
}

#wrapper {
    padding-bottom: 7%;
}
</style>
