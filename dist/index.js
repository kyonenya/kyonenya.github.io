var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { enrich } from './data';
import { route } from './router';
import { registerComponents } from './components';
const jsonPath = './data.json';
const index = () => __awaiter(void 0, void 0, void 0, function* () {
    document.querySelector('.el_search_form').addEventListener('input', () => {
        window.location.hash = encodeURIComponent(document.querySelector('.el_search_form').value);
    });
    const response = yield fetch(jsonPath);
    const rawData = yield response.json();
    const data = enrich(rawData);
    route(data);
    window.addEventListener('popstate', () => route(data));
    registerComponents(data);
});
index();
