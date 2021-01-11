<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>

    <!-- import css -->
    <link rel="stylesheet" href="{{ asset('/css/main-style.css') }}">

</head>

<body>
    <div id="app">
        <h1>Hello App!</h1>
        <p>
            <!-- use router-link component for navigation. -->
            <!-- specify the link by passing the `to` prop. -->
            <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
            <router-link to="/">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
            <router-link to="/thePathForURI">thePathForURI</router-link>
        </p>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
    </div>
    <!-- import js-->
    {{-- @if(config('app.env') !== 'local')
    <script src="{{ asset('/libs/js/vue.js') }}"></script>
    @else
    <script src="{{ asset('/libs/js/vue.min.js') }}"></script>
    @endif
    <script src="{{ asset('/libs/js/vue-router.js') }}"></script>
    <script src="{{ asset('/libs/js/vuex.js') }}"></script> --}}
    <!-- url libs import -->
    {{-- <script>
        @if(config('app.env') !== 'local')
            let vue = "{{ asset('/libs/js/vue.min.js') }}";
        @else
            let vue = "{{ asset('/libs/js/vue.js') }}";
        @endif
        let vueRouter = "{{ asset('/libs/js/vue-router.js') }}";
        let vueX = "/libs/js/vuex.js";
    </script> --}}
    <!-- document https://requirejs.org/ -->
    <script src="{{ asset('/libs/require.js') }}" data-main="{{ asset('/js/main_require.js') }}"></script>
    {{-- <script src="{{ asset('/js/main.js') }}"></script> --}}
</body>

</html>
