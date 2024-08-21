package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParagraphDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParagraphDTO.class);
        ParagraphDTO paragraphDTO1 = new ParagraphDTO();
        paragraphDTO1.setId(1L);
        ParagraphDTO paragraphDTO2 = new ParagraphDTO();
        assertThat(paragraphDTO1).isNotEqualTo(paragraphDTO2);
        paragraphDTO2.setId(paragraphDTO1.getId());
        assertThat(paragraphDTO1).isEqualTo(paragraphDTO2);
        paragraphDTO2.setId(2L);
        assertThat(paragraphDTO1).isNotEqualTo(paragraphDTO2);
        paragraphDTO1.setId(null);
        assertThat(paragraphDTO1).isNotEqualTo(paragraphDTO2);
    }
}
