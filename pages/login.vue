<template>
    <div id="login"  class="bg-theme bg-theme9">
        <div id="wrapper">
            <div class="card card-authentication1 mx-auto my-5">
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="text-center">
                            <img src="public/assets/images/image.png" alt="logo icon"
                                style="width: 100px; height: auto" />
                        </div>
                        <div class="card-title text-uppercase text-center py-3">Login</div>
                        <FormLogin/>
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
        <Footer/>
    </div>
    
</template>
<script setup>
import { title } from "/composables/title";
import { showInfoNotification } from "~/utils/notifications";
import { onMounted } from "vue";

definePageMeta({
  middleware: ["authenticated"],
});

onMounted(() => {
  showInfoNotification("Faça o login em sua conta.");
  title("Login");
});
</script>
<style>
    #login{
        padding-top: 5%;
    }
    #wrapper{
        padding-bottom: 5%;
    }
</style>
