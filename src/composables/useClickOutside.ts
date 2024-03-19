import {onBeforeUnmount, onMounted} from "vue";

export function useClickOutside(elTargetRef, callbackFn) {
    if (!elTargetRef) return;

    let listener = (event) => {
        if (event.target == elTargetRef.value.$el.parentNode || event.composedPath().includes(elTargetRef.value.$el.nextSibling)) {
            return;
        }

        if (typeof callbackFn == 'function') {
            callbackFn();
        }
    }

    onMounted(() => {
        window.addEventListener('click', listener)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('click', listener);
    })

    return {
        listener
    }
}