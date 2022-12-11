<script setup >
const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>


  <div class="col-md-8 p-3 pt-5">
                <!-- Pokusao sam odma vue implementirat po tvojem kodu za prosli format postova, al mi nis nije prikazivalo? Nisam siguran zakaj, zakomentiral sam da provjeris-->
                <!-- <div id="post1" class="shadow w-100 bg-light p-2 rounded my-4 mx-auto row mt-2">
                    <div class="d-flex align-items-center">
                        <h1 class="w-75">{{ posts.title }}</h1>
                        <div class="w-25">
                            <div class="d-flex justify-content-end align-items-center">
                                <a href="username.com" class="text-decoration-none ms-2 " style="font-size: 16px;">
                                    <span class="align-middle" >{{ posts.author }}</span> 
                                </a>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    21.12.2021
                                </span>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    {{ posts.tip }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pb-3" style="font-size: 18px;">
                        {{ posts.text }}
                    </div>
                    <hr class="w-75 mx-auto">
                    <div class="d-flex justify-content-start pb-1">
                        <div class="mx-2">{{ posts.smjer }}</div>
                        <div class="mx-2">{{ posts.predmet }}</div>
                        <div class="mx-2">{{ posts.kategorija }}</div>
                    </div>
                </div> -->
                <div id="post1" class="shadow w-100 bg-light p-2 rounded my-4 mx-auto row mt-2">
                    <div class="d-flex align-items-center">
                        <h1 class="w-75">Title</h1>
                        <div class="w-25">
                            <div class="d-flex justify-content-end align-items-center">
                                <a href="username.com" class="text-decoration-none ms-2 " style="font-size: 16px;">
                                    <span class="align-middle" >username</span> 
                                </a>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    21.12.2021
                                </span>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    Nudim
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pb-3" style="font-size: 18px;">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </div>
                    <hr class="w-75 mx-auto">
                    <div class="d-flex justify-content-start pb-1">
                        <div class="mx-2">Računarstvo</div>
                        <div class="mx-2">OOP</div>
                        <div class="mx-2">ZI</div>
                    </div>
                </div>
                <div id="post1" class="shadow w-100 bg-light p-2  rounded my-4 mx-auto row mt-2">
                    <div class="d-flex align-items-center">
                        <h1 class="w-75">Title</h1>
                        <div class="w-25">
                            <div class="d-flex justify-content-end align-items-center">
                                <a href="username.com" class="text-decoration-none ms-2 " style="font-size: 16px;">
                                    <span class="align-middle" >username</span> 
                                </a>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    21.12.2021
                                </span>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    Nudim
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pb-3" style="font-size: 18px;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <hr class="w-75 mx-auto">
                    <div class="d-flex justify-content-start pb-1">
                        <div class="mx-2">Računarstvo</div>
                        <div class="mx-2">OOP</div>
                        <div class="mx-2">ZI</div>
                    </div>
                </div>
                <div id="post1" class="shadow w-100 bg-light p-2  rounded my-4 mx-auto row mt-2">
                    <div class="d-flex align-items-center">
                        <h1 class="w-75">Title</h1>
                        <div class="w-25">
                            <div class="d-flex justify-content-end align-items-center">
                                <a href="username.com" class="text-decoration-none ms-2 " style="font-size: 16px;">
                                    <span class="align-middle" >username</span> 
                                </a>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    21.12.2021
                                </span>
                                <span class="ms-2 align-middle" style="font-size: 14px;">
                                    Nudim
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pb-3" style="font-size: 18px;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <hr class="w-75 mx-auto">
                    <div class="d-flex justify-content-start pb-1">
                        <div class="mx-2">Računarstvo</div>
                        <div class="mx-2">OOP</div>
                        <div class="mx-2">ZI</div>
                    </div>
                </div>
            </div>

</template>