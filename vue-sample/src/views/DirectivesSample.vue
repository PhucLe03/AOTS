<template>
    <div>
        <h2>Directives</h2>
        <!-- v-if -->
        <!-- <p v-if="isLogged">User Name: Nguyen Van Hai</p> -->
        <!-- <p v-else-if="cache">Hi Hai</p>
        <p v-else>Đăng nhập</p> -->
        <!-- v-bind -->
        <!-- <a v-bind:href="url">click</a>
        <div>
            <button v-bind:disabled="isDisabled">Click button</button>
        </div> -->
        <!-- v-model -->
        <!-- <div>
            <input v-model="message" />
            <p>{{ message }}</p>
        </div> -->
        <!-- v-for -->
        <!-- <div>
            <ul>
                <li v-for="item in users">{{ item.name }}</li>
            </ul>
        </div> -->
        <!-- v-on -->
        <!-- <button @click="showAlert">Show Hi</button>
        <input @keydown="showAlert" /> -->
        <!-- v-show -->
        <!-- <div v-show="isVisible">Visible</div> -->
        <!-- binding -->
        <!-- <div class="room">
            <input class="name" />
            <input class="price" />
            <input class="date" />
        </div> -->
        <!-- props -->
        <!-- <div>
            <PropsSample
                :message="messageToChild"
                :number="numberToChild"
            ></PropsSample>
        </div> -->
        <!-- axios -->
        <div>
            <button @click="getServices">Get Services</button>
            <ul>
                <li v-for="item in data">
                    <p>{{ item.name }}</p>
                    <p>{{ item.price }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import PropsSample from "./PropsSample.vue";
import axios from "axios";

export default {
    name: "DirectivesSample",
    components: {
        // PropsSample,
    },
    data() {
        return {
            isLogged: false,
            cache: false,
            url: "https://www.google.com/",
            isDisabled: true,
            message: "xin chao cac ban",
            users: [
                { id: 1, name: "item1" },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" },
                { id: 4, name: "item4" },
                { id: 5, name: "item5" },
            ],
            isVisible: false,
            room: {},
            messageToChild: "xin chao cac ban 123",
            numberToChild: 123,
            data: null,
        };
    },
    methods: {
        showAlert() {
            alert("hi ban");
        },
        getServices() {
            axios
            // thay đổi url của backend server api
                .get("http://localhost:27017/api/services")
                .then((response) => {
                    this.data = response;
                })
                .catch({});
        },
    },
};
</script>
