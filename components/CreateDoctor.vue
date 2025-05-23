<template>
    <div class="modal fade" id="createDoctorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-window-close-o"></i>
                    </button>
                </div>
                <div class="modal-body p-0 row" :class="['bg-theme', themeStore.theme]">
                    <div class="col-12 col-lg-5 ad p-0">
                        <img src="public/assets/images/doccreate.gif" width="100%" height="100%" />
                    </div>
                    <div class="details col-12 col-lg-7">
                        <h4><i class="fas fa-user-plus"></i> Cadastrar Médico</h4>
                        <form class="form-group mt-3 pt-3 mb-4" @submit.prevent="createDoctor">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input type="text" v-model="username" class="form-control" placeholder="Usuário" :class="{'is-valid': usernameValid, 'is-invalid': !usernameValid}" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                <input type="password" v-model="password" class="form-control" placeholder="Senha" :class="{'is-valid': isPasswordValid, 'is-invalid': !isPasswordValid}" required>
                                <div v-if="!isPasswordValid" class="invalid-feedback">
                                    A senha deve ter pelo menos 8 caracteres, incluir letras e números, e não ser apenas numérica.
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                <input type="email" v-model="email" class="form-control" placeholder="Email" :class="{'is-valid': emailValid, 'is-invalid': !emailValid}" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input type="text" v-model="name" class="form-control" placeholder="Nome" :class="{'is-valid': nameValid, 'is-invalid': !nameValid}" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-user-md"></i></span>
                                <input type="text" v-model="crm" class="form-control" placeholder="CRM" :class="{'is-valid': isCrmValid, 'is-invalid': !isCrmValid}" required>
                            </div>

                            <div>
                                <button type="submit" class="btn btn-light" :disabled="!isFormValid">
                                    <i class="fa fa-plus"></i> Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useThemeStore } from "~/stores/themeStore";
import { useAuthStore } from "~/stores/authtoken";
import { showSuccessNotification, showErrorNotification } from "~/utils/notifications";
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            name: '',
            password: '',
            email: '',
            crm: '',
        };
    },
    setup() {
        const themeStore = useThemeStore();
        return { themeStore };
    },
    computed: {
        isPasswordValid() {
            return this.password.length >= 8 && /[A-Za-z]/.test(this.password) && /\d/.test(this.password);
        },
        isCrmValid() {
            return /^[0-9]{6}$/.test(this.crm);
        },
        emailValid() {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(this.email);
        },
        nameValid() {
            return this.name.length > 0;
        },
        usernameValid() {
            const usernameRegex = /^[\w.@+-\s]+$/;
            return this.username.length >= 5 && usernameRegex.test(this.username);
        },
        isFormValid() {
            return this.isPasswordValid && this.isCrmValid && this.emailValid && this.nameValid && this.usernameValid;
        }
    },
    methods: {
        async createDoctor() {
            const authStore = useAuthStore();
            const token = authStore.token;

            if (!this.isFormValid) {
                showErrorNotification("Por favor, preencha todos os campos corretamente.");
                return;
            }

            const body = {
                username: this.username,
                name: this.name,
                password: this.password,
                email: this.email,
                crm: this.crm,
            };

            try {
                await axios.post("http://127.0.0.1:8000/api/v1/doctors/", body, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    }
                });
                this.resetForm();
                showSuccessNotification("Médico cadastrado com sucesso!");
            } catch (error) {
                console.error(error);
                showErrorNotification(error.response?.data?.message || "Erro ao cadastrar médico.");
            }
        },
        resetForm() {
            this.username = '';
            this.name = '';
            this.password = '';
            this.email = '';
            this.crm = '';
        }
    }
};
</script>
<style scoped>
input.is-invalid {
    border-color: #dc3545;
}

input.is-invalid ~ .invalid-feedback {
    color: #dc3545;
}

input.is-invalid ~ .invalid-feedback i {
    font-size: 1.2rem;
    margin-right: 5px;
}

.invalid-feedback {
    display: flex;
    align-items: center;
}

.invalid-feedback i {
    font-size: 1.2rem;
    margin-right: 5px;
}


@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }

    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.modal.fade .modal-dialog {
    transform: translateX(100%);
    opacity: 0;
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.modal.show .modal-dialog {
    transform: translateX(0);
    opacity: 1;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.input-group {
    margin-right: 20px;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #eee;
}

.modal-body {
    border-radius: 8% 2% 2% 8%;
}

img {
    border-radius: 8%;
}

.input-group-text i {
    font-size: 14px;
}

.container {
    display: flex;
    justify-content: center;
    margin-top: 200px;
    background: transparent;
}

.trigger {
    background-color: green;
    color: #fff;
}

.modal,
.fade,
.show {
    background-color: rgba(0, 0, 0, 0.25);
    padding-left: 10px;
    padding-right: 10px;
}

h2 {

    font-weight: bold;
    margin-bottom: 10px;
    color: #ffffff;
}

.modal-content {
    border: none;
    background: transparent;
    padding: 0 15px;
}

.close {
    position: relative;
    top: 48px;
    left: 13px;
    z-index: 1;
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
    color: rgb(255, 0, 0);
}

.modal-header {
    border: none;
}

.modal-header .close {
    padding: 0rem 1rem !important;
    margin: -1rem -1rem -1rem auto;
}

.modal-body {
    border: none;
    background-color: white;
    padding-bottom: 5px;
}

.close.focus,
.close:focus {
    outline: 0;
    box-shadow: none !important;
}

.form-control {
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0.5px 0px 0px #dae0e5 !important;
    color: #63686c;
    font-weight: bold;
    font-size: 20px;
}

.form-control::placeholder {
    font-size: 18px;
}

.form-control.focus {

    border: none;
    border-color: #fff;
    border-bottom: 1px solid #000;
    outline: 0;
    box-shadow: 0 0 0 0 rgba(0, 123, 255, .25);
}

h4 {
    display: none;
}

.modal-content{
    max-height: 400px;
}


@media (min-width:599px) {
    .modal-dialog {
        max-width: 47rem;
    }

    .details {
        padding: 60px 0 40px 50px;
    }

    .text-muted a {
        color: #c0bfbf;
        font-weight: bold;
        text-decoration: underline;
    }

    small.para {
        font-weight: bold;
        font-size: 14px;
        color: #63686c;
    }

    h4 {
        display: block;
    }
}

@media (max-width:599px) {
    .form-group {
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .input-group {
        margin-right: 0px;
    }

    .input-group-text i {
        font-size: 10px;
    }
}

@media (max-width:400px) {
    .form-group {
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .input-group {
        margin-right: 0px;
    }

    .input-group-text i {
        font-size: 8px;
    }
}
</style>