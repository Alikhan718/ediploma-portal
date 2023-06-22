import {MenuDrawMode} from "@src/pages/ConfigureMenuPage/types";

export interface IConfigureMenuPageLayout {
  menuID: string,
  handlePageChangeOrSearch: (p: any) => void,
  handleSection: (section_name: string, field: string, sort_order: number) => void,
  setDrawer: (val: MenuDraweMode) => void;
  handleEdit: (product_id: string) => void;
}

export interface IConfigureMenuHeader {
  onSearch: (page: number, search_name?: string) => void
}

export interface IAttributeGroupListDrawer {
    attribute_groups: any,
    open: boolean
}
export enum MenuDraweMode {
  CLOSE = "CLOSE",
  OPEN = "OPEN"
}

let data = {
    "attribute_groups": [
        {
            "id": "000000000000000000000000",
            "ext_id": "47bf669f-6d65-4207-9305-3963fe00d910",
            "max": 1,
            "min": 1,
            "attributes": [
                "8f9b76ef-5583-459c-ab96-7661eacbc820",
                "a3b81a3c-8145-4cf3-aab0-05a5c3b3f0a3"
            ],
            "attribute_object": [
                {
                    "ext_id": "8f9b76ef-5583-459c-ab96-7661eacbc820",
                    "name": "---люля баранина"
                },
                {
                    "ext_id": "a3b81a3c-8145-4cf3-aab0-05a5c3b3f0a3",
                    "name": "--- люля из курицы"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "dce0ec1b-67eb-47c1-ac5e-97ca2c8bdfd9",
            "min": 1000,
            "attributes": [
                "0269b6b0-bbc1-d534-0177-23c9dd3ecc0e"
            ],
            "attribute_object": [
                {
                    "ext_id": "0269b6b0-bbc1-d534-0177-23c9dd3ecc0e",
                    "name": "---шашлык из брынзы заготовка"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "47185da2-0937-4489-8cb3-63286a67fe65",
            "min": 1000,
            "attributes": [
                "9c1034d3-7907-47b8-a388-65617938e349",
                "9eca9741-8b18-4956-9d4e-04814a49d629",
                "55f3404e-6a5a-4028-b51e-0f773ef87f25"
            ],
            "attribute_object": [
                {
                    "ext_id": "9c1034d3-7907-47b8-a388-65617938e349",
                    "name": "---  комбо №3 кола 0,500л"
                },
                {
                    "ext_id": "9eca9741-8b18-4956-9d4e-04814a49d629",
                    "name": "--- комбо №3 шашлык по-карски"
                },
                {
                    "ext_id": "55f3404e-6a5a-4028-b51e-0f773ef87f25",
                    "name": "--- комбо №3 люля баранина"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "e6cf54b7-2370-4854-a9e6-49330f69fde9",
            "max": 1,
            "min": 1,
            "attributes": [
                "d50a308e-75f2-4bed-8643-68955b2d5be3",
                "0269b6b0-bbc1-d534-0177-23c9dd3ecd48",
                "cb3d738b-6c8f-4c19-a994-e673a474b0de",
                "f9d94d6e-59bc-48aa-b423-f86b42c3a7eb"
            ],
            "attribute_object": [
                {
                    "ext_id": "d50a308e-75f2-4bed-8643-68955b2d5be3",
                    "name": "--- фьюс ти 0,5 для всех комбо"
                },
                {
                    "ext_id": "0269b6b0-bbc1-d534-0177-23c9dd3ecd48",
                    "name": "--- минвода 0,5 для всех комбо"
                },
                {
                    "ext_id": "cb3d738b-6c8f-4c19-a994-e673a474b0de",
                    "name": "--- компот 0,5  для всех комбо"
                },
                {
                    "ext_id": "f9d94d6e-59bc-48aa-b423-f86b42c3a7eb",
                    "name": "--- кола 0,500л для всех комбо"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "8548e928-4d0c-496d-8664-da1bb4c7c49e",
            "max": 1,
            "min": 1,
            "attributes": [
                "0269b6b0-bbc1-d534-0177-23c9dd3ecd46",
                "0269b6b0-bbc1-d534-0177-23c9dd3ecd3f"
            ],
            "attribute_object": [
                {
                    "ext_id": "0269b6b0-bbc1-d534-0177-23c9dd3ecd46",
                    "name": "--- картофельные дольки с кетчупом к комбо"
                },
                {
                    "ext_id": "0269b6b0-bbc1-d534-0177-23c9dd3ecd3f",
                    "name": "--- картофель фри к блюду и комбо"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "bb1c366a-9d8f-40e7-8bbd-ae0b61587262",
            "min": 1000,
            "attributes": [
                "68b36c69-098d-45aa-a8b5-9f7cea0b7e59"
            ],
            "attribute_object": [
                {
                    "ext_id": "68b36c69-098d-45aa-a8b5-9f7cea0b7e59",
                    "name": "--- ассорти ханское подгарнировка кухня"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "ac20305a-97ac-400d-8372-04e205b5becf",
            "max": 1,
            "min": 1,
            "attributes": [
                "ec1b1b54-110e-4c6e-8873-0369b1bc719f",
                "54418138-e376-4a75-885e-2f6b812e9718"
            ],
            "attribute_object": [
                {
                    "ext_id": "ec1b1b54-110e-4c6e-8873-0369b1bc719f",
                    "name": "--- горячий"
                },
                {
                    "ext_id": "54418138-e376-4a75-885e-2f6b812e9718",
                    "name": "--- холодный"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "2ad3243d-2b33-4b55-bc2c-d7501c7b2b56",
            "min": 1000,
            "attributes": [
                "ae40c662-ad05-4d39-9e74-3fcc7c59ca27"
            ],
            "attribute_object": [
                {
                    "ext_id": "ae40c662-ad05-4d39-9e74-3fcc7c59ca27",
                    "name": "--- ассорти shipudim подгарнировка кухня"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "a4c9f96f-7cd1-4668-8ec0-9ed2f6f8afa6",
            "max": 1,
            "min": 1,
            "attributes": [
                "7a02c2a2-9643-42b9-9e4d-a7cfdbf31daa",
                "c56d162d-d378-4161-b1dd-9ef59eac2b23"
            ],
            "attribute_object": [
                {
                    "ext_id": "7a02c2a2-9643-42b9-9e4d-a7cfdbf31daa",
                    "name": "--- картофель фри к блюду"
                },
                {
                    "ext_id": "c56d162d-d378-4161-b1dd-9ef59eac2b23",
                    "name": "--- рис припущеный к блюду"
                }
            ],
            "IsDeleted": false
        },
        {
            "id": "000000000000000000000000",
            "ext_id": "93031ca0-0a75-40ec-976a-6913aa343711",
            "min": 1000,
            "attributes": [
                "0269b6b0-bbc1-d534-0177-23c9dd3ecc14"
            ],
            "attribute_object": [
                {
                    "ext_id": "0269b6b0-bbc1-d534-0177-23c9dd3ecc14",
                    "name": "--- куриное ассорти подгарнировка кухня"
                }
            ],
            "IsDeleted": false
        }
    ],
    "pagination": {
        "page": 1,
        "per_page": 10,
        "page_count": 1,
        "total_count": 10,
        "links": null
    }
}
